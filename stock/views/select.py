# -*- coding: utf-8 -*-g
# @Time : 2022/5/2 10:40
# @Author : Blink_Leo
# @File : select.py
# @Software: PyCharm
from django.http import JsonResponse
from family.models.member.member import Member

def select(request):
    user = request.user
    company_id = request.GET.get("company_id")
    member = Member.objects.filter(user=user).first()

    return JsonResponse({
        'result': "success",
    })
