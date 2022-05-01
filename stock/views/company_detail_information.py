# -*- coding: utf-8 -*-g
# @Time : 2022/5/1 23:19
# @Author : Blink_Leo
# @File : company_detail_information.py
# @Software: PyCharm


from bs4 import BeautifulSoup  # 网页解析，获取数据
import re  # 正则表达式，进行文字匹配
import urllib.request, urllib.error  # 制定URL，获取网页数据
from django.http import JsonResponse
import json
import decimal
# from datetime import time
import time

def askURL(url):
    # 模拟浏览器头部信息
    head = {
        "User-Agent": "Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 80.0.3987.122  Safari / 537.36"
    }
    # 用户代理，表示告诉服务器，我们是什么类型的机器、浏览器（本质上是告诉浏览器，我们可以接收什么水平的文件内容）

    request = urllib.request.Request(url, headers=head)
    # request = urllib.request.Request(url)
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


def company_detail_information(request):
    company_id = request.GET.get("company_id")
    place = request.GET.get("place")
    simple_name =request.GET.get("simple_name")

    # print()
    # print()
    # print(company_id)
    # print(place)
    # print(simple_name)
    # print()
    # print()

    stock_res = {
        'company_id': "",
        'simple_name': "",
        'trade_status': "",
        'update_time': "",
        'price_tem': "",
        'change_': "",
        'change_percent': "",
        'closing_price': "",
        'opening_price': "",
        'highest': "",
        'lowest': "",
        'amplitude': "",
        'turnover_ratio': "",
        'PER': "",
        'dynamic_PER': "",
        'PBR': "",
        'market_value': "",
        'circulation_market_value': "",
        'turnover_volume': "",
        'turnover_value': "",
        'volume_ratio': "",
        'circulation_shares': "",
        'total_shares': "",
        'BPS': ""
    }
    stock_res['company_id'] = company_id
    stock_res['simple_name'] = simple_name

    # return stock_res

    key = company_id + "." + place
    url = "https://api-ddc-wscn.xuangubao.cn/market/real?fields=prod_name,trade_status,update_time,last_px,px_change,px_change_rate,preclose_px,open_px,high_px,low_px,amplitude,turnover_ratio,pe_rate,dyn_pe,dyn_pb_rate,market_value,circulation_value,turnover_volume,turnover_value,hq_type_code,securities_type,volume_ratio,circulation_shares,total_shares,bps&prod_code=" + key

    html = askURL(url)  # 保存获取到的网页源码

    html = json.loads(html)

    context = decimal.getcontext()  # 获取decimal现在的上下文
    context.rounding = decimal.ROUND_HALF_UP  # 修改rounding策略

    # 退市的情况
    if (html['data']['snapshot'] == {}):
        trade_status = "已退市"
        stock_res['trade_status'] = "已退市"

        return stock_res

    # print("ok")

    # 股票代码
    company_id = company_id

    # 股票简称
    # simple_name=html['data']['snapshot'][key][0]
    # print(simple_name)

    # 交易状态
    trade_status = html['data']['snapshot'][key][1]
    if trade_status == "BREAK":
        trade_status = "已休市"
        stock_res['trade_status'] = trade_status
    elif trade_status == "HALT":
        trade_status = "停牌中"
        stock_res['trade_status'] = trade_status
    else:
        trade_status = "已开盘"
        stock_res['trade_status'] = trade_status

    # print(trade_status)

    # 更新时间
    update_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    stock_res['update_time'] = update_time
    # print(update_time)

    # 股价
    price_tem = decimal.Decimal(html['data']['snapshot'][key][3]).quantize(decimal.Decimal("0.01"))
    # print(price_tem)
    price_tem = str(price_tem)
    # print(price_tem)
    stock_res['price_tem'] = price_tem

    # 涨跌值
    change_ = decimal.Decimal(html['data']['snapshot'][key][4]).quantize(decimal.Decimal("0.01"))
    change_ = str(change_)
    stock_res['change_'] = change_

    # print(change_)

    # 涨跌百分比
    change_percent = decimal.Decimal(html['data']['snapshot'][key][5]).quantize(decimal.Decimal("0.01"))
    change_percent = str(change_percent)
    change_percent = change_percent + "%"
    stock_res['change_percent'] = change_percent
    # print(change_percent)

    # 昨日收盘价
    closing_price = decimal.Decimal(html['data']['snapshot'][key][6]).quantize(decimal.Decimal("0.01"))
    closing_price = str(closing_price)
    stock_res['closing_price'] = closing_price
    # print(closing_price)

    # 今日开盘价
    opening_price = decimal.Decimal(html['data']['snapshot'][key][7]).quantize(decimal.Decimal("0.01"))
    opening_price = str(opening_price)
    stock_res['opening_price'] = opening_price
    # print(opening_price)

    # 今日最高价
    highest = decimal.Decimal(html['data']['snapshot'][key][8]).quantize(decimal.Decimal("0.01"))
    highest = str(highest)
    stock_res['highest'] = highest
    # print(highest)

    # 今日最低价
    lowest = decimal.Decimal(html['data']['snapshot'][key][9]).quantize(decimal.Decimal("0.01"))
    lowest = str(lowest)
    stock_res['lowest'] = lowest
    # print(lowest)

    # 振幅
    amplitude = decimal.Decimal(html['data']['snapshot'][key][10]).quantize(decimal.Decimal("0.01"))
    amplitude = str(amplitude)
    amplitude = amplitude + "%"
    stock_res['amplitude'] = amplitude
    # print(amplitude)

    # 换手率
    turnover_ratio = decimal.Decimal(html['data']['snapshot'][key][11]).quantize(decimal.Decimal("0.01"))
    turnover_ratio = str(turnover_ratio)
    turnover_ratio = turnover_ratio + "%"
    stock_res['turnover_ratio'] = turnover_ratio
    # print(turnover_ratio)

    # 市盈率
    PER = decimal.Decimal(html['data']['snapshot'][key][12]).quantize(decimal.Decimal("0.01"))
    PER = str(PER)
    stock_res['PER'] = PER
    # print(PER)

    # 动态市盈率
    dynamic_PER = decimal.Decimal(html['data']['snapshot'][key][13]).quantize(decimal.Decimal("0.01"))
    dynamic_PER = str(dynamic_PER)
    stock_res['dynamic_PER'] = dynamic_PER
    # print(dynamic_PER)

    # 市净率
    PBR = decimal.Decimal(html['data']['snapshot'][key][14]).quantize(decimal.Decimal("0.01"))
    PBR = str(PBR)
    stock_res['PBR'] = PBR
    # print(PBR)

    # 总市值
    market_value = html['data']['snapshot'][key][15] / 100000000
    market_value = decimal.Decimal(market_value).quantize(decimal.Decimal("0.0"))
    market_value = str(market_value)
    market_value = market_value + "亿"
    stock_res['market_value'] = market_value
    # print(market_value)

    # 流通市值
    circulation_market_value = html['data']['snapshot'][key][16] / 100000000
    circulation_market_value = decimal.Decimal(circulation_market_value).quantize(decimal.Decimal("0.0"))
    circulation_market_value = str(circulation_market_value)
    circulation_market_value = circulation_market_value + "亿"
    stock_res['circulation_market_value'] = circulation_market_value
    # print(circulation_market_value)

    # 成交量
    turnover_volume = html['data']['snapshot'][key][17] / 1000000
    turnover_volume = decimal.Decimal(turnover_volume).quantize(decimal.Decimal("0.0"))
    turnover_volume = str(turnover_volume)
    turnover_volume = turnover_volume + "万手"
    stock_res['turnover_volume'] = turnover_volume
    # print(turnover_volume)

    # 成交额
    turnover_value = html['data']['snapshot'][key][18] / 100000000
    turnover_value = decimal.Decimal(turnover_value).quantize(decimal.Decimal("0.00"))
    turnover_value = str(turnover_value)
    turnover_value = turnover_value + "亿"
    stock_res['turnover_value'] = turnover_value
    # print(turnover_value)

    # # 是否停牌
    # suspend=""
    # if html['data']['snapshot'][key][19]=="SS.esa":
    #     suspend="停牌"
    # else:
    #     suspend = "正常交易"
    # print(suspend)

    # 量比
    volume_ratio = decimal.Decimal(html['data']['snapshot'][key][21]).quantize(decimal.Decimal("0.01"))
    volume_ratio = str(volume_ratio)
    stock_res['volume_ratio'] = volume_ratio
    # print(volume_ratio)

    # 流通股本
    circulation_shares = html['data']['snapshot'][key][22] / 100000000
    circulation_shares = decimal.Decimal(circulation_shares).quantize(decimal.Decimal("0.00"))
    circulation_shares = str(circulation_shares)
    circulation_shares = circulation_shares + "亿"
    stock_res['circulation_shares'] = circulation_shares
    # print(circulation_shares)

    # 总股本
    total_shares = html['data']['snapshot'][key][23] / 100000000
    total_shares = decimal.Decimal(total_shares).quantize(decimal.Decimal("0.00"))
    total_shares = str(total_shares)
    total_shares = total_shares + "亿"
    stock_res['total_shares'] = total_shares
    # print(total_shares)

    # 每股净资产
    BPS = decimal.Decimal(html['data']['snapshot'][key][24]).quantize(decimal.Decimal("0.01"))
    BPS = str(BPS)
    stock_res['BPS'] = BPS
    # print(BPS)



    # print(id)
    return JsonResponse(stock_res)