import datetime
from time import sleep

from django.http import JsonResponse
# 验证用户登录
from django.contrib.auth import authenticate, login
from family.models.member.member import Member
from django.utils.timezone import now, localtime
from django.utils.datetime_safe import datetime
import time
import datetime


def get_online(request):
    user = request.user
    member = Member.objects.filter(user=user).first()
    member.save()

    # 获取其他家庭成员的在线信息
    family = member.family
    # 如果没有家庭成员
    if not family:
        return JsonResponse({
            'result': "success",
            'username': user.username,
            'family_name': False,
            'family_member': False,
        })

    # 如果有家庭成员，获取所有家庭成员信息
    family_name = family.family_name
    family_member_all = Member.objects.filter(family=family).all()
    res_family_member = []

    # 最后在线时间差值为5秒，不然视为下线
    time_difference_target = datetime.timedelta(seconds=10)
    for i in family_member_all:
        # 查找player表获取得分

        # 确认是否在线
        time_difference = localtime(now()) - localtime(i.last_active_time)
        # 小于时间差，说明用户还在线
        if time_difference < time_difference_target:
            family_member = {'username': i.user.username, 'status': True}
        # 否则说明用户不在线
        else:
            family_member = {'username': i.user.username, 'status': False}

        res_family_member.append(family_member)

    return JsonResponse({
        'result': "success",
        'username': user.username,
        'family_name': family_name,
        'family_member': res_family_member,
    })
    # time.sleep(5)
    # different = localtime(now()) - localtime(member.last_active_time)
    #
    # target = datetime.timedelta(seconds=5)
    #
    # print()
    # print(localtime(now()) - localtime(member.last_active_time))
    # print(target > different)
    # print()
    # return JsonResponse({
    #     'result': "success"
    # })
