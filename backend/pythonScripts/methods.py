import sys
import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize

def json_to_df(file_name):
    """
    Parse a json file from GCS bucket to a Pandas dataframe
    Args:
        file_name: json file name
    Returns:
        df
    """
    with open(file_name) as f:
        list_raw = json.load(f)
    length = len(list_raw)
    df_raw = json_normalize(list_raw)
    return df_raw

def json_str_to_df(json_str):
    """
    Parse a json string bloc from GCS bucket to a Pandas dataframe
    Args:
        json_str: json blob
    Returns:
        df
    """
    list_raw = json.loads(json_str)
    df = json_normalize(list_raw)
    return df

def find_all_table_fields(df):
    """
    Finds all table fields
    Args:
        df: Pandas dataframe name
    Returns:
        list of table field names
    """
    res = []
    columns = df.columns
    for c in columns:
        df_first_val = df[df[c].notnull()]
        if (len(df_first_val.index) == 0):
            continue
        is_array = isinstance(df_first_val.iloc[0][c], list)
        if is_array:
            res.append(c)
    return res

def df_explode(df, array_field_to_explode, key_fields):
    """
    Parse a responseData json file from GCS bucket to a pandas dataframe
    Args:
        df: raw df
        array_field_to_explode: the array json field that we mayb want to flatten, default None
        key_fields: for flatten ops, fields that can be used as row uuid
    Returns:
        df_exploded: df with multiple obj from given array field exploded
        df_nested_nan[meta_keys]: the ops will skip all rows with array_field_to_explore=na, this is a list of which rows    
    """
    df_nested_nan = df[df[array_field_to_explode].isnull()]
    df = df[df[array_field_to_explode].notna()]
    list_raw = df.to_json(orient='records')
    parsed = json.loads(list_raw)
    df_exploded = json_normalize(data=parsed, record_path=array_field_to_explode,
                     meta=key_fields, record_prefix = array_field_to_explode + '.')
    cols = df_exploded.columns.to_list()
    id_col_num = len(key_fields)
    cols = cols[-id_col_num:] + cols[:-id_col_num]
    # put all id fields in the beginning of the result dataframe
    df_exploded = df_exploded[cols]

    return df_exploded, df_nested_nan[key_fields]


def checkDupe(df, groupByFields, keyField):
    """
    the goal is to verify that if there's unique record per keyField,
    there's unique records per groupby columns,
    
    example: f_list = ['Email','Current_Benefit_Elections_group.CF_LRV_Worker_Benefit_PTO_Value',\
                        'Current_Benefit_Elections_group.CF_LRV_Benefit_Elections_-_AC_401k_4_']
             checkDupe(df, f_list, "Email")
    Args:
        df: dataFrame
        groupByFields: list of columns
        keyIfled: id field for each entity
    Returns:
        None
    """
    new_df = df.drop_duplicates(groupByFields)
    for count_per_group in new_df.groupby(keyField).size():
        if count_per_group > 1:
            print("not unique: ")
            print(new_df[keyField])
    print("All unique, pass")
    