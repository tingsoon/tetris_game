Rules of tetris game

Gameboard = 10 x 20
Up, down, left, right to move pieces
Q to rotate counter-clockwise
E to rotate clockwise
Spacebar to hard drop 

Game starts after countdown of 3 seconds

Using original nintendo scoring system

Level	Points for 1 line	2 lines		3 lines		4 lines
0		40					100			300			1200	
1		80					200			600			2400
n  		40*(n+1)			100*(n+1)	300*(n+1)	1200*(n+1)

if clear 15 rows, increase level by 1

Types of pieces

Cyan I
	[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 1, 0, 0]

Yellow O

	[1, 1],
	[1, 1]

Purple T
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0]

Green S
	[0, 0, 0],
	[0, 1, 1],
	[1, 1, 0]

Red Z
	[0, 0, 0],
	[1, 1, 0],
	[0, 1, 1]

Blue J
	[0, 1, 0],
	[0, 1, 0],
	[1, 1, 0]

Orange L
	[0, 1, 0],
	[0, 1, 0],
	[0, 1, 1]


Make grid into an array that is full of 0s

A piece in the bottom of the grid will look smth like this

[0, 0, 0, 1, 1, 1, 1, 0, 0, 0] - 1st row with letter I at the bottom

Need to make a function that stores the value as it goes down the grid

Use different numbers to show different colors of the grid

Make a function that controls the pieces

Make a function collide function to prevent the pieces to move out of the grid and to make a piece stop colliding when it touches other pieces. - as long as one part of the piece collides, the whole piece will stop moving.

Once a row is filled, clear the numbers, add the score, unshift the bottom row all the way to the top

Game ends when a new piece collides immediately in row 20.






