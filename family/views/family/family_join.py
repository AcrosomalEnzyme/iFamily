from django.http import JsonResponse
from django.contrib.auth.models import User
from family.models.member.member import Member
from family.models.family.family import Family
from django.http import JsonResponse


def family_join(request):
    # 获取传输过来的用户名和密码
    data = request.GET
    username = data.get('username')
    family_name = data.get('family_name')
    family_password = data.get('family_password')

    user = request.user

    # 返回错误

    if not family_name:
        return JsonResponse({
            'result': "家庭名字不能为空"
        })

    # if family_password != family_password_confirm:
    #     return JsonResponse({
    #         'result': "两次密码不一致"
    #     })

    # 如果家庭不存在
    if not Family.objects.filter(family_name=family_name).exists():
        return JsonResponse({
            'result': "该家庭不存在"
        })

    # 判断密码
    family = Family.objects.filter(family_name=family_name).first()
    if family.family_password != family_password:
        return JsonResponse({
            'result': "家庭密码不正确"
        })

    # 创建家庭
    # Family.objects.create(family_name=family_name, family_password=family_password)

    # 满足条件，把用户加入家庭
    member = Member.objects.filter(user=user).first()
    member.family = family
    member.save()

    return JsonResponse({
        'result': "success"
    })
