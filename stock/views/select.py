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
    file_path =member.stock_code.path
    print(file_path)
    file = open(file_path, 'r')

    # codes = str(file.read().splitlines())
    codes = str(file.read())
    # codes = codes[2:]
    # codes = codes[:-1]
    # print()
    # print()
    # print(codes)
    # print(codes.split(","))
    # print(type(codes))
    # print()
    # print()
    file.close()
    # 表示不包含这个股票代码
    if codes.find(company_id) == -1:
        file = open(file_path, 'a')
        file.write(company_id)
        file.close()
        return JsonResponse({
            'result': "success",
        })
    else:

        return JsonResponse({
            'result': "success",
        })

