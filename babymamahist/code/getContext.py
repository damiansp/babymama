import re

def get_context(match, n_chars, text_in, text_out = None):
    '''
    Find all instances of match in text_in along with n_chars on either side,
    and return and/or write to text_out.
    '''
    text = open(text_in, 'r').read().lower()
        
    comp = re.compile('baby[s]? m[ao]m[m]?a')
    iterator = comp.finditer(text)

    out = open(text_out, 'w')
    for match in iterator:
        line =  text[(match.span()[0] - n_chars):(match.span()[1] +  n_chars)]

        # Reduce all whitespace to a single space
        line = re.sub(r'\s+', ' ', line)
        out.write(line + '\n\n\n')
        print line

    out.close()


get_context('baby mama', 50, '../txt/tfull.txt', '../txt/matchtext50.txt')
    
