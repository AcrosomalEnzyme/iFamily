# -*- coding: utf-8 -*-g
# @Time : 2022/4/30 23:36
# @Author : Blink_Leo
# @File : plate_index.py
# @Software: PyCharm
from django.shortcuts import render

def plate_up_index(request):
    return render(request,"plate_up.html")

def plate_down_index(request):
    return render(request,"plate_down.html")