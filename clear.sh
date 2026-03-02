#!/bin/bash
clear
kubectl delete -f application.yaml
kubectl delete all --all -n app