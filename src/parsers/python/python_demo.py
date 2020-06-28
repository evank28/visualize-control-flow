from random import randint

#Init
print("Hello World")

# Declare func
def func(num: int):
    return num**2


x = randint(0,1)

if x:
    LIST = [1,2,3,4]
    for i in LIST:
        print(i**2)
        
else:
    i = 0
    while i < 10:
        i_2 = func(i)
        print(i_2)
        i = randint(0,15)

print("Good Bye")