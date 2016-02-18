import codecs
import json
import pprint

pp = pprint.PrettyPrinter(indent = 2)

text_file = open('bm_text.json')
json_str = text_file.read()
text_data = json.loads(json_str)

# Check
#pp.pprint(text_data)


def push_text(year):
    out = ''
    d = text_data['y' + year]
    for k, v in d.iteritems():
        out  += (' ' + v)

    return out

t2004 = push_text('2004')
t2005 = push_text('2005')
t2006 = push_text('2006')
t2007 = push_text('2007')
t2008 = push_text('2008')
t2009 = push_text('2009')
t2010 = push_text('2010')
t2011 = push_text('2011')
t2012 = push_text('2012')
t2013 = push_text('2013')
t2014 = push_text('2014')
t2015 = push_text('2015')
t2016 = push_text('2016')

ts = [t2004, t2005, t2006, t2007, t2008, t2009, t2010, t2011, t2012, t2013,
      t2014, t2015, t2016]

full_text = ''

for t in ts:
    full_text += t

ts.append(full_text)

# Write each to text files
#outfile = 'test.txt'
#text = t2004

def write_txt(text, outfile):
    txt = codecs.open(outfile, mode = 'a', encoding = 'utf-8')
    txt.write(text)
    txt.close()

outfiles = ['t2004.txt', 't2005.txt', 't2006.txt', 't2007.txt', 't2008.txt',
            't2009.txt', 't2010.txt', 't2011.txt', 't2012.txt', 't2013.txt',
            't2014.txt', 't2015.txt', 't2016.txt', 'tfull.txt']

for i in range(len(ts)):
    write_txt(ts[i], outfiles[i])
