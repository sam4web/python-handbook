---
title: scikit-learn Intro
description: Basic supervised learning workflow, load data, split, train a model, and evaluate.
---
# Machine Learning Intro with scikit-learn
scikit-learn provides machine learning algorithms and tools for model selection and evaluation.

## Example: simple classification
```python filename="sklearn_example.py"
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

data = load_iris()
X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2)
clf = RandomForestClassifier()
clf.fit(X_train, y_train)
print('Accuracy:', accuracy_score(y_test, clf.predict(X_test)))
```

## Tips
- Preprocess and scale features where appropriate.
- Use cross-validation to estimate performance reliably.

## Exercise
- Train a simple regressor on the Boston housing dataset and report RMSE.
