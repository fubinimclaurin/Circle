class Complex{
  constructor(re, im){
    this.re = re;
    this.im = im;
  }
  add(c){
    this.re += c.re;
    this.im += c.im;
  }
  mult(c){
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new Complex(re, im);
  }

}


function dft(x){
  let X = [];
  let N = x.length;

 for (let k = 0; k<N; k++){
   let sum = new Complex(0,0);
    for(let n = 0; n< N; n++){
      const par = (TWO_PI*k*n)/N;
      const c = new Complex(cos(par), -sin(par));
      sum.add(x[n].mult(c));
    }

    sum.re = sum.re/N;
    sum.im = sum.im/N;
    let fq= k;
    let ampl = sqrt(sum.re *sum.re + sum.im*sum.im);
    let phase = atan2(sum.im, sum.re);
    X[k] =  {re: sum.re ,im : sum.im ,fq, ampl, phase};
  }
  return X;
}
