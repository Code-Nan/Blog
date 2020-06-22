from django.db import models


# 用户
class User(models.Model):
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=30)
    date = models.CharField(max_length=20)

    def __str__(self):
        return '%s %s' % (self.name, self.email)
