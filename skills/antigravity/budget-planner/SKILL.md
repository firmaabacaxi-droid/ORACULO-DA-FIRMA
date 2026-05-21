---
name: budget-planner
description: "Plan and track professional budgets. Category allocation, monitoring spending vs. actuals, and variance analysis."
---

# Budget Planner (Analytical)

Manage project and business finances with structured tracking.

## Core Workflows
- **Create**: "Create a budget for [Project] with $[Amount]".
- **Log**: "Log $[Spent] under [Category]".
- **Report**: "How's my budget looking?" or "Where am I overspending?".

## Variance Analysis
- ⚠️ **Warning**: 80% allocation reached.
- 🔴 **Over**: Allocation exceeded.
- 📉 **Projection**: Extrapolate end-of-month spend from current pace.

Maintain markdown tables in the workspace for persistence, and sync to Supabase `transactions` table for business intelligence.

## Supabase Sync
- **Table**: `public.transactions`
- **Logic**: Every logged expense should trigger an `execute_sql` call to update the central ledger.
