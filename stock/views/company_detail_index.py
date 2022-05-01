# -*- coding: utf-8 -*-g
# @Time : 2022/5/1 17:44
# @Author : Blink_Leo
# @File : company_detail_index.py
# @Software: PyCharm
from django.shortcuts import render, redirect
from stock.models.CompanyBaseInformation import CompanyBaseInformation


def company_detail_index(request):
    username = request.GET.get("username")
    search_kind = request.GET.get("search_kind")
    search_information = request.GET.get("search_information")
    company_id = ""
    place = ""
    simple_name = ""

    # 如果查找的类型为数字代码，去数据库查找数字代码
    if search_kind == "1":
        company = CompanyBaseInformation.objects.filter(company_id=search_information).first()
        company_id = search_information
        place = company.place
        simple_name = company.simple_name

    # 如果查找的类型为字母代码，去数据库查找数字代码
    elif search_kind == "2":
        company = CompanyBaseInformation.objects.filter(eng_id__iexact=search_information).first()
        company_id = company.company_id
        place = company.place
        simple_name = company.simple_name

    # 如果查找的类型为中文代码，去数据库查找数字代码
    elif search_kind == "3":
        company = CompanyBaseInformation.objects.filter(simple_name=search_information).first()
        company_id = company.company_id
        place = company.place
        simple_name = company.simple_name

    return render(request, "company_detail.html",
                  {'company_id': company_id, 'place': place, 'simple_name': simple_name})
    # return render(request, "company_detail.html", data = seach_information)
