export default function InputModal({ children }) {
  return (
    <>
      <div className="z-50 bg-secondary rounded-dashboardcontainer p-10 w-[600px] h-96 fixed ml-auto mr-auto left-0 right-0 mt-auto mb-auto top-0 bottom-0">
        {children}
      </div>
    </>
  )
}