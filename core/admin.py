from django.contrib import admin
from .models import Client, Job, Task

admin.site.register(Client)
admin.site.register(Job)
admin.site.register(Task)
