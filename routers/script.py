import pandas as pd
import warnings as w
import numpy as np
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
w.simplefilter(action = 'ignore', category = FutureWarning)
w.simplefilter(action = 'ignore', category = UserWarning)
import keras

X = pd.read_csv('/Users/nahuahc/Projects/college-project/routers/dataset.csv')
X.columns  = ['sno','Latitude','Longitude','potholes','severity', 'ranking']
X = X.set_index(X.sno)
X = X.drop(['sno'],axis=1)
data = X[['Latitude','Longitude', 'severity', 'ranking']]
labels = X['potholes']

data = np.array(data)
labels = np.array(labels.values)

from keras.utils import np_utils
from keras.models import Sequential
from keras.layers.convolutional import Convolution2D, MaxPooling2D
from keras.layers import Activation, Flatten, Dense, Dropout
from keras.optimizers import SGD
from keras.layers.normalization import BatchNormalization as bn

labels_new = []
for i in range(len(labels)):
    if int(labels[i])<20:
        labels_new.append(0)
    elif int(labels[i])<30:
        labels_new.append(1)
    elif int(labels[i])<40:
        labels_new.append(2)


model = Sequential()
model.add(Dense(12, input_dim=3, init='uniform', activation='relu'))
model.add(bn())
model.add(Dropout(0.4))

model.add(Dense(10, input_dim=2, init='uniform', activation='relu'))
model.add(bn())
model.add(Dropout(0.4))
model.add(Dense(6, init='uniform', activation='relu'))
model.add(bn())
model.add(Dropout(0.4))
model.add(Dense(3, init='uniform', activation='softmax'))
# Compile model
model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])


print(model.predict(np.array([[13.0706,77.7250, 2]])))
