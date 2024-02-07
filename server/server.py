from flask import Flask, jsonify, request
from flask_cors import CORS

# app instance
app = Flask(__name__)
CORS(app)

@app.route("/calc", methods=['POST'])

def main():
    if request.method == 'POST':
        data = request.get_json()
        print(data['total_days'])
        # data = {
        #     'total_days': int,
        #     'flatmates': [
        #         {
        #             'name': str,
        #             'expenditure': float,
        #             'absent_days': int,
        #         }
        #     ]
        # }

        # total number of days in invoice period
        total_days = int(data['total_days'])

        # Get the number of flatmates
        num_flatmates = len(data['flatmates'])

        # lists to store flatmates info
        names = []
        expenditures = []
        days_absent = []

        # Gather info for each flatmate
        for i in range(len(data['flatmates'])):
            # name = input(f"Enter the name of flatmate #{i+1}: ")
            # expenditure = float(input(f"Enter {name}'s total expenditure: "))
            # absent_days = int(input(f"Enter the number of days {name} was not at home: "))
            
            names.append(data['flatmates'][i]['name'])
            expenditures.append(float(data['flatmates'][i]['expenditure']))
            days_absent.append(int(data['flatmates'][i]['absent_days']))

        # Calculate expenses
        total_expenditure, daily_cost_per_person, individual_costs = calculate_expenses(names, expenditures, days_absent, total_days)

        #  who owes who
        settlements = settle_debts(individual_costs)

        print(f"\nThe total expenditure for the flat is: {total_expenditure:.2f}")
        print(f"The daily cost per person is: {daily_cost_per_person:.2f}\n")

        for name, cost in individual_costs.items():
            status = "receives" if cost > 0 else "owes"
            print(f"{name} {status}: {abs(cost):.2f}")

        #  who owes who
        settlements = settle_debts(individual_costs)

        print("\nSettlements:")
        for settlement in settlements:
            print(settlement)

        return jsonify({
                'total_expenditure': total_expenditure,
                'daily_cost_per_person': round(daily_cost_per_person,2 ),
                'individual_costs': individual_costs,
                'settlements': settlements
            }
        )




def calculate_expenses(names, expenditures, days_absent, total_days):
    # Calculate total present days for each person
    total_present_days = [total_days - absent for absent in days_absent]
    
    # Calculate total present days for all flatmates
    sum_total_present_days = sum(total_present_days)
    
    # Calculate the total expenditure
    total_expenditure = sum(expenditures)
    
    # Calculate the share per day for each flatmate
    individual_share_per_day = total_expenditure / sum_total_present_days
    
    # Calculate individual total shares
    individual_total_shares = [individual_share_per_day * present for present in total_present_days]
    
    # Calculate individual costs and amounts owed or to be reimbursed
    individual_costs = {names[i]: expenditures[i] - individual_total_shares[i] for i in range(len(names))}

    return total_expenditure, individual_share_per_day, individual_costs


def settle_debts(individual_costs):
    # Split into two groups: 1) who owe money 2) who are owed money
    debtors = {name: -cost for name, cost in individual_costs.items() if cost < 0}
    creditors = {name: cost for name, cost in individual_costs.items() if cost > 0}

    settlements = []

    # settling debts
    while debtors and creditors:
        # Find the debtor with the smallest debt and the creditor who is owed the most
        debtor, debt_amount = min(debtors.items(), key=lambda x: x[1])
        creditor, credit_amount = max(creditors.items(), key=lambda x: x[1])

        # Calculate amount
        transaction_amount = min(debt_amount, credit_amount)

        # Record the transaction
        settlements.append(f"{debtor} owes {creditor}: {transaction_amount:.2f}")

        # Update amounts
        debtors[debtor] -= transaction_amount
        creditors[creditor] -= transaction_amount

        # If 1) debt is settled, remove them from list
        if debtors[debtor] == 0:
            del debtors[debtor]

        # If 2) is repaid, remove them from list
        if creditors[creditor] == 0:
            del creditors[creditor]

    return settlements

if __name__ == "__main__":
    #only renders the app if no error occurred
    app.run(debug=True, port=8080)
