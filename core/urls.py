from django.conf.urls import url
from . import views

# TODO - update to use Class based views
urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^clients/', views.clients, name='clients'),
    url(r'^client/(?P<client_id>[0-9]+)/$', views.client_detail, name='client_detail'),
    url(r'^client/(?P<client_id>[0-9]+)/edit/$', views.client_edit, name='client_edit'),
    url(r'^client/new/$', views.client_new, name='client_new'),
    url(r'^jobs/', views.jobs, name='jobs'),
    url(r'^job/(?P<job_id>[0-9]+)/$', views.job_detail, name='job_detail'),
    url(r'^job/(?P<job_id>[0-9]+)/edit/$', views.job_edit, name='job_edit'),
    url(r'^job/new/$', views.job_new, name='job_new'),
    url(r'^search/', views.search, name='search'),
]


# Custom error handling
# handler404 = 'views.custom_page_not_found_view'
