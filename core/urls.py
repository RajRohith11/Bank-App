from django.urls import path
from . import views

urlpatterns = [
    path('customers/', views.CustomerListCreate.as_view(), name='customer-list'),
    path('customers/<int:pk>/', views.CustomerDetail.as_view(), name='customer-detail'),

    path('accounts/', views.AccountListCreate.as_view(), name='account-list'),
    path('accounts/<int:pk>/', views.AccountDetail.as_view(), name='account-detail'),

    path('transactions/', views.TransactionListCreate.as_view(), name='transaction-list'),
    path('transactions/<int:pk>/', views.TransactionDetail.as_view(), name='transaction-detail'),
]
