"""
Preprocesses text to organize words in hash table
"""

import json
import re


with open('trump.txt','r') as f:
    data = f.read()
    #print data
    #convert to list of sentences, determined by period
    sentences = data.split('.')


    print sentences[0]
    dict = {}

    for index, sentence in enumerate(sentences):

        for word in sentence.split():
            if len(word) < 5:
                continue
            word = re.split(",|;|!|'s", word)[0]
            if word in dict:
                dict[word].append(index)
            else:
                dict.update({word:[index]})

    print dict

    f_to = open('trumpParsed.txt', 'w')

    f_to.write(str(json.dumps(dict)))
