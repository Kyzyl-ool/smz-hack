# TeamForProject

# Description

# Machine learning + Dataset

To determine which specialists are needed to solve the problem, the following is needed:

1. A trained model that can extract keywords from the task description.
2. A trained model that can extract keywords from the description of tasks that a particular specialist can solve.
3. Algorithm that will match by task keywords and specialist tags.

In our project we use TF-IDF for for keyword extraction. TF-IDF can actually be used to extract important keywords from a document to get a sense of what characterizes a document. These keywords can be used as a very simple summary of a document, and for text-analytics when we look at these keywords in aggregate. We used Python skikit-learn library with TF-IDF in this stage.
 
We used a Stack Overflow dataset which is a bit noisy and simulates what you could be dealing with in real life. You can find this dataset in our repo. File "stackoverflow-data-idf.json" with 20,000 posts is used to compute the Inverse Document Frequency (IDF). This Stack Overflow dataset contains 19 fields including post title, body, tags, dates, and other metadata which we don’t need for this project. In our project, we are mostly interested in the body and title. These became our source of text for keyword extraction.

We created a field that combines both body and title so we have the two in one field. We also printed the second text entry in our new field just to see what the text looks like. We used the CountVectorizer to create a vocabulary from all the text in our df_idf['text'] , followed by the counts of words in the vocabulary. The result is a sparse matrix representation of the counts. Each column represents a word in the vocabulary. Each row represents the document in our dataset, where the values are the word counts.

We are passing two parameters to CountVectorizer, max_df and stop_words. The first is just to ignore all words that have appeared in 85% of the documents, since those may be unimportant. The later is a custom stop words list. You can also use stop words that are native to sklearn by setting stop_words='english'. 

The resulting shape of word_count_vector is (20000,124901) since we have 20,000 documents in our dataset (the rows) and the vocabulary size is 124,901.

In some text mining applications, such as clustering and text classification, we typically limit the size of the vocabulary. It’s really easy to do this by setting max_features=vocab_size when instantiating CountVectorizer. For this project we limited our vocabulary size to 10,000. Important: the IDF should always be based on a large corpora, and should be representative of texts you would be using to extract keywords. 

Once we have our IDF computed, we are ready to compute TF-IDF and then extract top keywords from the TF-IDF vectors.

In our project, we extracted the top keywords from the tasks's description and keyword from the descriptions of specialists' tasks. After that our model finds matches between specialist's skills and task's keywords. After that you will have list of team members with their skills, which they need to solve a task!

# Tools

1. Python3.6 
2. Flask framework (for web-server)
3. Skikit-learn library (for machine learning)
4. HTML, CSS



