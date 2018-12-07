#!/usr/bin/python3

for x in range(1, 15):
	print(
		"<rect width=\"%d\" height=\"%d\" style=\"animation-duration:%fs\"/>"%(
			(x*50),
			(x*50),
			(10+(100/x)),
		)
	);
