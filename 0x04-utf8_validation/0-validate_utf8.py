#!/usr/bin/python3
def validUTF8(data):
    # Number of bytes remaining in the current UTF-8 character
    bytes_remaining = 0

    for num in data:
        # Check if num is a valid byte (between 0 and 255)
        if num > 255:
            return False

        # If no bytes are expected, determine the number of bytes in the current character
        if bytes_remaining == 0:
            # 1-byte character
            if num >> 7 == 0:
                continue
            # 2-byte character (starts with 110xxxxx)
            elif num >> 5 == 0b110:
                bytes_remaining = 1
            # 3-byte character (starts with 1110xxxx)
            elif num >> 4 == 0b1110:
                bytes_remaining = 2
            # 4-byte character (starts with 11110xxx)
            elif num >> 3 == 0b11110:
                bytes_remaining = 3
            else:
                return False
        else:
            # Check if the current byte is a continuation byte (starts with 10xxxxxx)
            if num >> 6 != 0b10:
                return False
            bytes_remaining -= 1

    # If we've consumed all expected continuation bytes, it's valid
    return bytes_remaining == 0
