from django.contrib import admin
from family.models.member.member import Member
from family.models.family.family import Family
# Register your models here.

#注册编写的Member，Family类
admin.site.register(Member)
admin.site.register(Family)
