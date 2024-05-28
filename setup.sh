#!/bin/bash
bun install
cp .env.example .env
bun format
bun dev
