# Financial Tracker - HUX Master's Project

A responsive, single-page financial tracking application built with Vue 3, Pinia, and TailwindCSS.

## Short Documentation

This project helps users track income and expenses, visualize spending by category, and view balances in their preferred currency. It is optimized for quick entry of transactions and a clear, mobile-friendly dashboard.

## Team Members

- Elisaveta Voropaeva 
- Polina Averkova
- Julia Naguib

## Live Application

- https://personalfinancedashboard-hux.netlify.app/

## Purpose

To provide a simple, modern personal finance tracker that makes it easy to understand spending habits at a glance.

### Motivation (Optional)

Built to practice full-stack front-end architecture with Vue 3 + TypeScript while solving a real-world budgeting need.

## Features

- **Dashboard**: Overview of total income, expenses, balance, and expense category breakdown.
- **Transaction Management**: Add new income/expense transactions with category and date.
- **History**: View, filter, sort, and delete all transactions.
- **Currency Exchange**: Real-time currency conversion for all displayed amounts.
- **Theming**: Light and Dark mode support.

## Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Styling**: TailwindCSS
- **Routing**: Vue Router
- **Language**: TypeScript
- **Testing**: Vitest (Unit), Playwright (E2E)

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Local Development & Configuration

- **Node.js**: Use a recent LTS version (18+ recommended).
- **Package Manager**: npm (via Node.js).
- **Environment Variables / API Keys**:
  - None required for local development.

## Brief User Guide

1. **Open the app** and you’ll land on the dashboard.
2. **Add a transaction** via the Add Transaction page (income or expense, category, amount, date).
3. **Review spending** on the Dashboard summary and category breakdown.
4. **Manage history** in the History page: filter, sort, or delete transactions.
5. **Switch currency** with the currency selector for real-time conversion.
6. **Toggle theme** between light/dark mode.