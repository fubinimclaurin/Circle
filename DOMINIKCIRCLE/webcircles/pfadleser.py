import numpy as np
from PIL import Image

image_path = 'Dominik_pfad.png'

original_image = Image.open(image_path).convert('L')
np_img = np.array(original_image, dtype=np.uint8)
np_img = ~np_img  
np_img[np_img > 0] = 1

pfad =[]
for x in range(np_img[0].size):
    for y in range(np_img[1].size):
       if np_img[x][y]:
            pfad.append([x,y])


with open("coordinates.txt", 'w') as f:
    f.write("let drawing = [")
    f.write("\n")
    for x in pfad:
        f.write(f"{{ x : {x[1]}, y : {x[0]} }},")
        f.write("\n")
    f.write("];")

