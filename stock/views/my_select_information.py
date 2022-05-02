# -*- coding: utf-8 -*-g
# @Time : 2022/5/2 16:50
# @Author : Blink_Leo
# @File : my_select_information.py
# @Software: PyCharm
# coding=utf-8
from django.http import JsonResponse
from pyparsing import unicode

from family.models.member.member import Member
from stock.models.CompanyBaseInformation import CompanyBaseInformation
from stock.views.company_detail_information import company_detail_information_two


def get_my_companys(request):
    user = request.user
    member = Member.objects.filter(user=user).first()
    file_path = member.stock_code.path
    file = open(file_path, 'r')
    codes = file.read().splitlines()
    file.close()
    # return JsonResponse({
    #     'result': "success",
    #     'my_companys': codes,
    # })

    my_companys = ""
    for code in codes:
        company = CompanyBaseInformation.objects.filter(company_id=code).first()
        my_companys = my_companys + code + ","
        my_companys = my_companys + company.place + ","
        my_companys = my_companys + company.simple_name + ";"


    return JsonResponse({
        'result': "success",
        'my_companys': my_companys,
    })


def get_my_select_information(request):
    user = request.user
    member = Member.objects.filter(user=user).first()

    # data = request.GET.get('my_companys')
    data = unicode(request.GET.get('my_companys'))

    print(data)
    my_companys = data.split(";")

    # print(my_companys)

    data=[]
    # for company in my_companys:
    #     company_info=company.split(",")
    #     company_id = company_info[0]
    #     place = company_info[1]
    #     simple_name = company_info[2]
    #     res=company_detail_information_two(company_id, place, simple_name)
    #     data.append(res)

    return JsonResponse({
        'result': "success",
        'data': my_companys,
    })
