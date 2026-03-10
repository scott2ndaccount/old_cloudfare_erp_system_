export default function NewInvoice() {
  return (
    <div>
      <h1>Create Invoice</h1>

      <form action="/api/invoices" method="POST">
        <input name="invoice_number" placeholder="Invoice Number" />
        <input name="amount" placeholder="Amount" />

        <button type="submit">Create Invoice</button>
      </form>
    </div>
  )
}
