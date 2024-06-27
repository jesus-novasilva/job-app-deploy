from rest_framework import status, authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
# import logging
from django.conf import settings
from django.http import HttpResponse
# from rest_framework_simplejwt.tokens import RefreshToken
 
from django.shortcuts import render

from django.views.generic import View
import os
from .forms import JobForm
from .models import Job, Category
from .serializer import JobSerializer, JobDetailSerializer, CategorySerializer

# logger = logging.getLogger(__name__)
 
# def TokenView(request):
#     if request.user.is_authenticated:
#             logger.info("User is authenticated")
#             refresh = RefreshToken.for_user(request.user)
 
#             access_token = str(refresh.access_token)
#             refresh_token = str(refresh)
 
#     response = {
#         'access_token': access_token,
#         'refresh_token': refresh_token,
#     }
    
#     return JsonResponse(response)




class CategoriesView(APIView):
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)

class NewestJobsView(APIView):
    def get(self, request, format=None):
        jobs = Job.objects.all()[0:6]
        serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data)
    
class MyJobsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        jobs = Job.objects.filter(created_by=request.user)
        serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data)
    
class CreateJobView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        form = JobForm(request.data)

        if form.is_valid():
            job = form.save(commit=False)
            job.created_by = request.user
            job.save()

            return Response({'status': 'created'})
        else:
            return Response({'status': 'errors', 'errors': form.errors})
        
    def put(self, request, pk):
        job = Job.objects.get(pk=pk, created_by=request.user)
        form = JobForm(request.data, instance=job)
        form.save()

        return Response({'status': 'updated'})

    def delete(self, request, pk):
        job = Job.objects.get(pk=pk, created_by=request.user)
        job.delete()

        return Response({'status': 'deleted'})
    

class BrowseJobsView(APIView):
    def get(self, request, format=None):
        jobs = Job.objects.all()
        categories = request.GET.get('categories', '')
        query = request.GET.get('query', '')

        if query:
            jobs = jobs.filter(title__icontains=query)

        if categories:
            jobs = jobs.filter(category_id__in=categories.split(','))
        serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data)
    
class JobsDetailView(APIView):
    def get(self, request, pk, format=None):
        job = Job.objects.get(pk=pk)
        serializer = JobDetailSerializer(job)

        return Response(serializer.data)