#!/usr/bin/python3
"""
validUTF8
"""

def validUTF8(data):
    """Determines if a given data set represents a valid UTF-8 encoding"""
    count = 0

    for x in data:
        # Normalize values greater than 255 to fit in a byte range
        x = x % 256

        if 191 >= x >= 128:
            if not count:
                return False
            count -= 1
        else:
            if count:
                return False

            if x < 128:
                continue
            elif x < 224:
                count = 1
            elif x < 240:
                count = 2
            elif x < 248:
                count = 3
            else:
                return False

    return count == 0
