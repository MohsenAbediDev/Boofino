export default function InputModal({ children, height }) {
  return (
    <>
      <div className={`z-50 bg-secondary rounded-dashboardcontainer p-10 w-[600px] lg:w-[95%] fixed ml-auto mr-auto left-0 right-0 mt-auto mb-auto top-0 bottom-0 lg:px-4 transition-all`} 
      style={{
        height: height
      }}>
        {children}
      </div>
    </>
  )
}