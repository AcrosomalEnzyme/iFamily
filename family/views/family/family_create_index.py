# -*- coding: utf-8 -*-g
# @Time : 2022/4/22 10:34
# @Author : Blink_Leo
# @File : family_create_index.py
# @Software: PyCharm
from django.shortcuts import render

def family_create_index(request):
    return render(request,"family/family_create.html")