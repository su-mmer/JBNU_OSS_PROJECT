#!/usr/bin/python
# -*- coding: utf-8 -*-

import editdistance
import sys

### dept 리스트에 dept.txt 파일을 -를 기준으로 나눠서 한 줄씩 읽어온다.
dept = []
with open('dept.txt', 'r') as file:
    for text in file:
        dept.append(text.rstrip('\n').split('-'))

### deptdict 딕셔너리에 학과명은 key, 위치는 value로 저장한다.
deptdict={}
for index in dept:
    deptdict[index[0].strip()] = index[1].strip()

# dictionary의 value들만 저장한 list
deptlist = list(deptdict.keys())
locale = list(deptdict.values())

def levenshtein(text):
    # 입력이 제대로 들어온 경우
    if text in deptdict.keys():
        print(deptdict[text])

    # 입력이 제대로 들어오지 않은 경우
    else:
        # editdistance를 저장할 list
        levenLength = []

        # dictionary의 key를 돌면서 editdistance를 list에 저장한다.(정수)
        for i in deptdict.keys():
            levenLength.append(editdistance.eval(i, text))

        # 가장 작은 숫자가 들어있는 index 저장
        index = levenLength.index(min(levenLength))
        print (deptlist[index]+"을 말씀하시는 건가요? "+locale[index]+"입니다.")

if __name__ == '__main__':
        levenshtein(sys.argv[1])