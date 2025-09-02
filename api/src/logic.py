from .models import Sort, Filter
from typing import List


def page_data(data, page: int, limit: int): 

    start_idx = (page) * limit
    end_idx = start_idx + limit

    return data.iloc[start_idx:end_idx]

def sort_data(data, sort_logic: Sort): 
    # Convert 'asc' to True and 'desc' to False
    boolean_directions = [direction == 'asc' for direction in sort_logic.directions]

    return data.sort_values(by=sort_logic.columns, ascending=boolean_directions)


def search_name(data, query):
    # should add validation if *name is empty
    # manipulate data - merge firstname + lastname in key fullname 
    data['fullName'] = data['firstName'] + ' ' + data['lastName'] 

    results = data[
        data['fullName'].str.lower().str.contains(query.lower(), na=False) # not a very good solution, vurder start with
    ]
    return results


# this is a very bad filter function hehe
def filter_data(data, filters: List[Filter]):

    df = data

    for filter in filters:

        logic = filter.logic
        value = filter.value
        column = filter.column

        if filter.type == 'bool':
           if logic == '==':
                filtered = df[df[column] == value]
                df = filtered
           elif logic == '!=':
                filtered = df[df[column] != value]
                df = filtered

        if filter.type == 'num':
            if logic == '==':
                filtered = df[df[column] == value]
                df = filtered
            elif logic == '!=':
                filtered = df[df[column] != value]
                df = filtered
            elif logic == '>':
                filtered = df[df[column] > value]
                df = filtered
            elif logic == '<':
                filtered = df[df[column] < value]
                df = filtered
            elif logic == '>=':
                filtered = df[df[column] >= value]
                df = filtered
            elif logic == '<=':
                filtered = df[df[column] <= value]
                df = filtered

        elif filter.type == "text":
            if logic == "contains":
                filtered = df[df[column].str.contains(value, na=False, case=False)]
                df = filtered
            elif logic == "startswith":
                filtered = df[df[column].str.lower().str.startswith(value, na=False)]
                df = filtered
            elif logic == "endswith":
                filtered = df[df[column].str.lower().str.endswith(value, na=False)]
                df = filtered

    return df
