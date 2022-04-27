# 必须要加的头文件
from django.http import JsonResponse
# 添加数据库表
from game.models.player.player import Player
from family.models.member.member import Member
from family.models.family.family import Family
from django.contrib.auth import get_user_model


def getinfo_home(request):
    # 获取到发送请求的用户
    user = request.user

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
        print(family_member_all)
        res_family_member = []
        for i in family_member_all:
            user = i.user
            # 查找player表获取得分
            score = Player.objects.filter(user=user).first().score
            family_member = {'username': user.username, 'photo': i.photo.url, 'score': score, 'status': True}
            res_family_member.append(family_member)


        return JsonResponse({
            'result': "success",
            'username': user.username,
            'photo': photo_url,
            'family_name': family_name,
            'family_member': res_family_member,
        })
