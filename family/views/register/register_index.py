# -*- coding: utf-8 -*-g
# @Time : 2022/4/15 11:15
# @Author : Blink_Leo
# @File : register_index.py
# @Software: PyCharm
from django.shortcuts import render

def register_index(request):
    return render(request,"family/register.html")