# 必须要加的头文件
from django.http import JsonResponse
# 添加数据库表
from game.models.player.player import Player
from family.models.member.member import Member
from family.models.family.family import Family
from django.contrib.auth import get_user_model
from django.utils.timezone import now, localtime
# from django.utils.datetime_safe import datetime
import datetime

def getinfo_home(request):
    # 获取到发送请求的用户
    user = request.user

    print("test username")
    print(user.username)

    # 利用内置函数判断用户是否登录
    if not user.is_authenticated:
        return JsonResponse({
            'result': "未登录"
        })
    else:
        # 查找当前用户的信息
        member = Member.objects.filter(user=user).first()
        photo_url = member.photo.url
        family = member.family

        # family = Family.objects.filter(member__in=member)
        # 如果没有家庭成员
        if not family:
            return JsonResponse({
                'result': "success",
                'username': user.username,
                'photo': photo_url,
                'family_name': False,
                'family_member': False,
            })

        # 如果有家庭成员，获取所有家庭成员信息
        family_name = family.family_name
        family_member_all = Member.objects.filter(family=family).all()
        # print(family_member_all)
        res_family_member = []

        # 最后在线时间差值为5秒，不然视为下线
        time_difference_target = datetime.timedelta(seconds=10)
        for i in family_member_all:
            # 查找player表获取得分
            score = Player.objects.filter(user=user).first().score

            print()
            print(i.user.username)
            print(localtime(i.last_active_time))
            print()

            # 确认是否在线
            time_difference = localtime(now()) - localtime(i.last_active_time)
            # 小于时间差，说明用户还在线
            if time_difference < time_difference_target:
                family_member = {'username': i.user.username, 'photo': i.photo.url, 'score': score, 'status': True}
            # 否则说明用户不在线
            else:
                family_member = {'username': i.user.username, 'photo': i.photo.url, 'score': score, 'status': False}

            res_family_member.append(family_member)

        return JsonResponse({
            'result': "success",
            'username': user.username,
            'photo': photo_url,
            'family_name': family_name,
            'family_member': res_family_member,
        })
