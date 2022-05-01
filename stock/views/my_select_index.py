# -*- coding: utf-8 -*-g
# @Time : 2022/5/1 17:02
# @Author : Blink_Leo
# @File : my_select_index.py
# @Software: PyCharm
from django.shortcuts import render

def my_select_index(request):
    return render(request,"my_select.html")