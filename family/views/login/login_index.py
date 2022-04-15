# -*- coding: utf-8 -*-g
# @Time : 2022/4/15 10:47
# @Author : Blink_Leo
# @File : login_index.py
# @Software: PyCharm
from django.shortcuts import render

def login_index(request):
    return render(request,"family/login.html")