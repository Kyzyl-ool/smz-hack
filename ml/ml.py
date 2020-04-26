import pandas as pd
import re
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def pre_process(text):

    # lowercase
    text=text.lower()

    #remove tags
    text=re.sub("</?.*?>"," <> ",text)

    # remove special characters and digits
    text=re.sub("(\\d|\\W)+"," ",text)

    return text

def get_stop_words(stop_file_path):
    """load stop words """

    with open(stop_file_path, 'r', encoding="utf-8") as f:
        stopwords = f.readlines()
        stop_set = set(m.strip() for m in stopwords)
        return frozenset(stop_set)

def sort_coo(coo_matrix):
    tuples = zip(coo_matrix.col, coo_matrix.data)
    return sorted(tuples, key=lambda x: (x[1], x[0]), reverse=True)

def extract_topn_from_vector(feature_names, sorted_items, topn=10):
    """get the feature names and tf-idf score of top n items"""

    #use only topn items from vector
    sorted_items = sorted_items[:topn]

    score_vals = []
    feature_vals = []

    for idx, score in sorted_items:
        fname = feature_names[idx]

        #keep track of feature name and its corresponding score
        score_vals.append(round(score, 3))
        feature_vals.append(feature_names[idx])

    #create a tuples of feature,score
    #results = zip(feature_vals,score_vals)
    results= {}
    for idx in range(len(feature_vals)):
        results[feature_vals[idx]]=score_vals[idx]

    return results

def get_keywords(idx):

    #generate tf-idf for the given document
    tf_idf_vector=tfidf_transformer.transform(cv.transform([docs_test[idx]]))

    #sort the tf-idf vectors by descending order of scores
    sorted_items=sort_coo(tf_idf_vector.tocoo())

    #extract only the top n; n here is 10
    keywords=extract_topn_from_vector(feature_names,sorted_items,10)

    return keywords

def print_results(idx,keywords):
    # now print the results
    print("\n=====Title=====")
    print(docs_title[idx])
    print("\n=====Body=====")
    print(docs_body[idx])
    print("\n===Keywords===")
    for k in keywords:
        print(k,keywords[k])

def check_require_skills(keywords, skills):
    for k in keywords:
        for d in skills:
            if k == d:
                return True
    return False

# read json into a dataframe
df_idf=pd.read_json("static/data/stackoverflow-data-idf.json",lines=True)

# print schema
print("Schema:\n\n",df_idf.dtypes)
print("Number of questions,columns=",df_idf.shape)

df_idf['text'] = df_idf['title'] + df_idf['body']
df_idf['text'] = df_idf['text'].apply(lambda x:pre_process(x))

#show the first 'text'
df_idf['text'][2]

#load a set of stop words
stopwords=get_stop_words("static/resources/stopwords.txt")

#get the text column
docs=df_idf['text'].tolist()

#create a vocabulary of words,
#ignore words that appear in 85% of documents,
#eliminate stop words
cv=CountVectorizer(max_df=0.85,stop_words=stopwords)
word_count_vector=cv.fit_transform(docs)

word_count_vector.shape

cv=CountVectorizer(max_df=0.85,stop_words=stopwords,max_features=10000)
word_count_vector=cv.fit_transform(docs)
word_count_vector.shape

list(cv.vocabulary_.keys())[:10]

list(cv.get_feature_names())[2000:2015]

tfidf_transformer=TfidfTransformer(smooth_idf=True,use_idf=True)
tfidf_transformer.fit(word_count_vector)

tfidf_transformer.idf_

# read test docs into a dataframe and concatenate title and body
df_test=pd.read_json("static/data/stackoverflow-test.json",lines=True)
df_test['text'] = df_test['title'] + df_test['body']
df_test['text'] =df_test['text'].apply(lambda x:pre_process(x))

# get test docs into a list
docs_test=df_test['text'].tolist()
docs_title=df_test['title'].tolist()
docs_body=df_test['body'].tolist()

# you only needs to do this once
feature_names=cv.get_feature_names()

# get the document that we want to extract keywords from
doc=docs_test[0]

#generate tf-idf for the given document
tf_idf_vector=tfidf_transformer.transform(cv.transform([doc]))

#sort the tf-idf vectors by descending order of scores
sorted_items=sort_coo(tf_idf_vector.tocoo())

#extract only the top n; n here is 10
keywords=extract_topn_from_vector(feature_names,sorted_items,10)

# now print the results
print("\n=====Title=====")
print(docs_title[0])
print("\n=====Body=====")
print(docs_body[0])
print("\n===Keywords===")
for k in keywords:
    print(k,keywords[k])


@app.route('/check', methods=['POST'])
def get_require_workers():
    global df_test
    global docs_test
    global docs_title
    global docs_body
    #get request with task description
    title = request.form['Title']
    body = request.form['Body']
    #Update data & get keywords
    with open("static/data/stackoverflow-test.json", mode='r+') as feedsjson:
        feeds = json.load(feedsjson)
        feeds["body"] = body
        feeds["title"] = title
        feedsjson.seek(0)
        feedsjson.write(json.dumps(feeds))
        feedsjson.truncate()
    df_test=pd.read_json("static/data/stackoverflow-test.json",lines=True)
    df_test['text'] = df_test['title'] + df_test['body']
    df_test['text'] =df_test['text'].apply(lambda x:pre_process(x))

    # get test docs into a list
    docs_test=df_test['text'].tolist()
    docs_title=df_test['title'].tolist()
    docs_body=df_test['body'].tolist()

    idx=0
    keywords=get_keywords(idx)
    print_results(idx,keywords)
    #keywords dictionary for every profession
    data_scientist_words = ["machine", "learning", "statistics", "algorithms", "analyse"]
    backend_words = ["server", "database", "sql", "nosql", "storage"]
    frontend_words = ["web", "visualization", "form", "site", "platform"]
    mobile_words = ["ios", "android", "application", "mobile", "smartphone", "iphone"]
    design_words = ["visualization", "interface", "UI", "UX", "friendly"]
    #check matches
    data_scientist = check_require_skills(keywords, data_scientist_words)
    backend = check_require_skills(keywords, backend_words)
    frontend = check_require_skills(keywords, frontend_words)
    mobile = check_require_skills(keywords, mobile_words)
    design = check_require_skills(keywords, design_words)

    data = []

    if (data_scientist == True):
        data.append("Data scientist (Python, R, machine learning methods)")

    if (backend == True):
        data.append("Backend developer (Python/PHP, MySQL/PostreSQL/MongoDB)")

    if (frontend == True):
        data.append("Frontend developer (Javascript, React.js/Vue.js, HTML, CSS)")

    if (mobile == True):
        data.append("Mobile developer (IOS/Android/React Native)")

    if (design == True):
        data.append("Designer (Adobe Photoshop, Figma, Sketch)")

    if (data == None):
        data.append("There is no such specialiost")

    return json.dumps(data)

@app.route("/")
def startpage():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
