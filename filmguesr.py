import csv
import time
import random

class Movie:
    def __init__(film, name, year, director):

        film.name = name
        film.year = year
        film.director = director

    def win(exp, multiplier):

        print("You won!")

        random.randrange(1,5)
        exp += (random.randrange(100,120)) * multiplier
        print(f"+{exp} EXP!")

        return exp
    
    def lose(exp):

        print("You Lost!")
        print(f"EXP: {exp}")

def gameLoop():
    i = 4
    while i:
        print("Still true!")
        i -= 1
    print("EXITING")
    return i


def main():
    exp = 100
    # Game Loop
    while gameLoop() == True:
        gameLoop()





main()