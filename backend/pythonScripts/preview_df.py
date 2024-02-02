import sys
import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *

# print("python script is running now...")
d = {'col1': [1, 2], 'col2': [3, 4]}
df = json_to_df('resources/paveSchema.json')
#df = pd.DataFrame(data=d)

# dataToSendBack = "This is from Python"
# print(dataToSendBack)
print(df.head(1).to_html())
sys.stdout.flush()