import DropDowm from "@components/control/dropdown"
import { AppState } from "@store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetCities, handleGetMonths, handleGetYears } from "@store/thunk/formation";
import { downloadFormation } from "@services/formation"
import { commonActions } from "@store/slices/common"
import { useRouter } from "next/router"

function DownloadSidebar() {
  const router = useRouter()
  const dispatch = useDispatch();
  const [data, setData] = useState<any>({
    city_id: "",
    month: "",
    year: ""
  })

  const { cities, months, years } = useSelector((state: AppState) => state.formations)

  const [currentYears, setCurrentYears] = useState([])

  useEffect(() => {
    dispatch(handleGetCities())
    // dispatch(handleGetMonths())
    // dispatch(handleGetYears())
  }, [])

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [event.target.name]: event.target.value })
    if (event.target.name == 'city_id') {
      cities?.data?.map((item: any) => {
        if (item.id == event.target.value) {
          let computedYears = item?.years?.map((year: any) => year?.year)
          setCurrentYears(computedYears)
        }
      })
    }
  }


  const handleDownloadFormation = async () => {
    try {
      const response = await downloadFormation(data);
      if (response.data?.data?.error) {
        dispatch(commonActions.showToast({ message: "file not found", type: "error" }))
      }
      else {
        const { file, city, year } = response.data?.data
        localStorage.setItem("formation", JSON.stringify({
          file_id: file?.id,
          city,
          year,
          title: file?.title,
          description: file?.description
        }))
      }
      router.push('/page/formation')
    } catch (error: any) {
      dispatch(commonActions.showToast({ message: "file not found", type: "error" }))
    }

  }

  return (
    <div className="downloadsWrap">
      <h3>Accéder au contenu de nos formations </h3>
      <p>
        Si vous avez participé à une formation dirigée par Alexandre Garcia, directeur pédagogique du Centre International d’Antibes, ou par l’un des enseignants de l’équipe pédagogique, vous trouverez ici, les documents mis à votre disposition.
      </p>
      <div className="form">
        <DropDowm onChange={handleSelect} data={cities?.data || []} name="city_id" title="LIEU DE LA FORMATION" placeholder="Sélectionner une ville" />
        {
          data.city_id && <>
            <div className='dropdown'>
              <label>ANNÉE</label>
              <select name='year' onChange={handleSelect}>
                <option id='' selected disabled>Sélectionner l'année</option>
                {
                  currentYears?.map((item)=>(
                    <option id={item} value={item}>{item}</option>
                  ))
                }
              </select>
            </div >
          </>
        }
        <button onClick={handleDownloadFormation} className="downloadBtn">
          <i className="far fa-download"></i>
          accéder au contenu
        </button>
      </div>
    </div>
  )
}

export default DownloadSidebar