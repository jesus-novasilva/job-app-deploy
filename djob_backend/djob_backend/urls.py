
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.authtoken')),
    path('api/v1/jobs/', include('job.urls')),
]

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('oauth2/', include('django_auth_adfs.urls')),
#     path('api/v1/jobs/', include('job.urls')),
# ]