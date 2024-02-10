import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *
import os

# print("python script is running now...")
d = {'col1': [1, 2], 'col2': [3, 4]}
json_blob = sys.argv[1]
df = json_str_to_df(json_blob)
#df = pd.DataFrame(data=d)

# dataToSendBack = "This is from Python"
# print(dataToSendBack)
print(df.head(1).to_html())
sys.stdout.flush()