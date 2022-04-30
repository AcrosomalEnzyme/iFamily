from bs4 import BeautifulSoup  # 网页解析，获取数据
import re  # 正则表达式，进行文字匹配
import urllib.request, urllib.error  # 制定URL，获取网页数据
from stock.models.CompanyBaseInformation import CompanyBaseInformation
from django.http import JsonResponse


# import stock.models.CompanyBaseInformation


def check_place(company_id):
    place = ""
    one = company_id[0:1]
    three = company_id[0:3]
    # 为了配合选股宝，所以改成SS表示上海
    if (one == "5" or one == "6" or one == "9"):
        place = "SS"
        return place
    else:
        if (three == "009" or three == "126" or three == "110" or three == "201" or three == "202" or three == "203" or three == "204"):
            place = "SS"
            return place
        else:
            place = "SZ"
            return place


def askURL(url):
    # 模拟浏览器头部信息
    head = {
        "User-Agent": "Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 80.0.3987.122  Safari / 537.36"
    }
    # 用户代理，表示告诉豆瓣服务器，我们是什么类型的机器、浏览器（本质上是告诉浏览器，我们可以接收什么水平的文件内容）

    request = urllib.request.Request(url, headers=head)
    html = ""
    try:
        response = urllib.request.urlopen(request)
        html = response.read().decode("utf-8")
        # print(html)
    except urllib.error.URLError as e:
        if hasattr(e, "code"):
            print(e.code)
        if hasattr(e, "reason"):
            print(e.reason)
    return html


def getData(baseurl):
    global company_id, simple_name, name, eng_id, place
    company_id = ""
    simple_name = ""
    name = ""
    eng_id = ""
    place = ""
    company_id = ""
    url = baseurl
    html = askURL(url)  # 保存获取到的网页源码

    # print(html)

    # 2.逐一解析数据
    soup = BeautifulSoup(html, "html.parser")
    # 获取所有td标签的HTML源文件
    infor = soup.find_all('td')
    list = []
    # print(infor)

    # 遍历每一个td标签的HTML源文件
    for item in infor:
        # print(item)
        # 提取其中的字符串
        list.append(item.string)
        # print(item.string)

    # 删除前6条数据
    list = list[6:]
    # print(list)
    # for i in range(0, 6):
    # print(i)
    # print(list[i])
    # 删除前6条数据
    # del list[0]

    # 按倍数提取数据
    for item in range(len(list)):

        if item % 5 == 1:
            company_id = list[item]

        if item % 5 == 2:
            simple_name = list[item]

        if item % 5 == 3:
            name = list[item]

        if item % 5 == 4:
            eng_id = list[item]
            # print(eng_id)

            # db.ping(reconnect=True)


            place = check_place(company_id)
        # cursor.execute(sql, [company_id, simple_name, name, eng_id, place])
        # db.commit()
        # 必须放在if后面执行插入数据库，表示收集到一套完整的股票数据
            CompanyBaseInformation.objects.create(company_id=company_id, simple_name=simple_name, name=name, eng_id=eng_id, place=place)
    # print("ok1")

    return 0


def getData2(baseurl1, baseurl3):
    global company_id, simple_name, name, eng_id, place
    company_id = ""
    simple_name = ""
    name = ""
    eng_id = ""
    place = ""
    for x in range(2, 186):
        url = baseurl1 + str(x) + baseurl3
        html = askURL(url)  # 保存获取到的网页源码
        soup = BeautifulSoup(html, "html.parser")

        infor = soup.find_all('td')
        list = []

        for item in infor:
            list.append(item.string)
            # print(item.string)

        # 删除前6条数据
        list = list[6:]
        # for i in range(0, 6):
        # print(list[i])
        # del list[0]

        for item in range(len(list)):
            if item % 5 == 1:
                company_id = list[item]
                # print(company_id)

            if item % 5 == 2:
                simple_name = list[item]

            if item % 5 == 3:
                name = list[item]

            if item % 5 == 4:
                eng_id = list[item]
                # print(eng_id)

                # db.ping(reconnect=True)
                place = check_place(company_id)
                # print(place)
                CompanyBaseInformation.objects.create(company_id=company_id, simple_name=simple_name, name=name,
                                                      eng_id=eng_id, place=place)

            # cursor.execute(sql, [company_id, simple_name, name, eng_id, place])
            # db.commit()

        # print(x)

    return 0


def get_company_base_information(request):
    baseurl = "http://www.yz21.org/stock/info/"

    baseurl1 = "http://www.yz21.org/stock/info/stocklist_"
    baseurl3 = ".html"

    # 1.爬取网页
    datalist = getData(baseurl)
    datalist = getData2(baseurl1, baseurl3)
    # update company_base set simple_name='青岛中程',name='青岛中资中程集团股份有限公司',eng_id='QDZC' where id='300208';
    #             update company_base set simple_name='*ST舜喆B',name='广东舜喆(集团)股份有限公司',eng_id='STSZB' where id='200168';
    #             update company_base set simple_name='昇兴股份',name='昇兴集团股份有限公司',eng_id='SXGF' where id='002752';
    CompanyBaseInformation.objects.filter(company_id='300208').update(simple_name='青岛中程',name='青岛中资中程集团股份有限公司',eng_id='QDZC')
    CompanyBaseInformation.objects.filter(company_id='200168').update(simple_name='*ST舜喆B', name='广东舜喆(集团)股份有限公司',eng_id='STSZB')
    CompanyBaseInformation.objects.filter(company_id='002752').update(simple_name='昇兴股份', name='昇兴集团股份有限公司',eng_id='SXGF')
    print("爬取完毕！")
    return JsonResponse({
        'result': "success"
    })
