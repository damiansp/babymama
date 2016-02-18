import re

def process_text(textfile):
    '''
    Read a text file.  Convert to lower and strip out all non-alphanumerics.
    Parse each word and append to an array to be returned.
    '''
    
    t = open(textfile).read()
    t = t.lower()

    # replace all non alphanumerics with ' '
    t = re.sub(r'[^\w\s]', ' ', t)

    # replace all white space with single space: ' '
    t = re.sub(r'\s+',' ', t)
    t_split = t.split(' ')

    # Check
    # print y_split[:10]
    return t_split

# Test
#t2004_array = process_text('t2004.txt')
#print t2004_array[:30]

def one_gram(word_array):
    # Create a dictionary of form { word: count }
    one_gram = {}
    for w in word_array:
        if w in one_gram:
            one_gram[w] += 1
        else:
            one_gram[w] = 1

    return one_gram

# Test
#t_1gram = one_gram(t2004_array)
#print t_1gram

            
            
def n_gram(n, word_array):
    '''
    Take as input text, an array of words, (word_array) and store all counts
    of n-grams to a dictionary of form { [w1, w2, ..., wn]: count, ... }
    '''
    # Initialize output dictionary
    counts = {}

    for w in range(len(word_array) - (n - 1)):
        word_combo = tuple(word_array[w:(w + n)])

        if word_combo in counts:
            counts[word_combo] += 1
        else:
            counts[word_combo] = 1

    return counts
    
# Test
#t_2gram = n_gram(2, t2004_array)
#print t_2gram


def write_csv(filename, ngrams, onegram = False):
    '''
    Write each n-gram list to a .csv file with the following fomatting:

    ngram,count\n
    where ngram = "w1 w2 ... wn" (words separated by single space)
    '''
    
    ngram_out = open(filename, 'w')

    # n-gram,count\n
    for ngram, count in ngrams.iteritems():
        if not onegram:
            ngram = ','.join(ngram)
        ngram_out.write(ngram + ',' + str(count) + '\n')

    ngram_out.close()

years = [
    '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012',
    '2013', '2014', '2015', '2016', 'full']

for y in years:
    text_file = 'txt/t' + y + '.txt'
    t_split = process_text(text_file)
    t_1gram = one_gram(t_split)
    t_2gram = n_gram(2, t_split)
    t_3gram = n_gram(3, t_split)
    t_4gram = n_gram(4, t_split)

    write_csv('csv/t' + y + '_1gram.csv', t_1gram, onegram = True)
    write_csv('csv/t' + y + '_2gram.csv', t_2gram)
    write_csv('csv/t' + y + '_3gram.csv', t_3gram)
    write_csv('csv/t' + y + '_4gram.csv', t_4gram)

    
    
