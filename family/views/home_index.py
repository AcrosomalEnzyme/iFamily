# -*- coding: utf-8 -*-g
# @Time : 2022/4/25 23:35
# @Author : Blink_Leo
# @File : home_index.py
# @Software: PyCharm
from django.shortcuts import render

def home_index(request):
    return render(request,"home.html")